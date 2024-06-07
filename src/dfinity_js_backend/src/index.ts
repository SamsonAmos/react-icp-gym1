import {
    query,
    update,
    text,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
    None,
    Some,
    Ok,
    Err,
    ic,
    Principal,
    nat64,
    Duration,
    Result,
    bool,
    Canister
} from "azle";
import {
    Ledger,
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from "azle/canisters/ledger";
import { v4 as uuidv4 } from "uuid";

const GymServicePayload = Record({
    gymId: text,
    serviceName: text,
    serviceDescription: text,
    operatingDaysStart: text,
    operatingDaysEnd: text
});

const MembershipPayload = Record({
    fullName: text,
    userName: text,
    emailAddress: text,
    userId: text,
    gymId: text
});

const Gym = Record({
    id: text,
    owner: Principal,
    gymName: text,
    gymImgUrl: text,
    gymLocation: text,
    gymDescription: text,
    emailAddress: text,
    members: Vec(MembershipPayload),
    gymServices: Vec(GymServicePayload)
});

const GymPayload = Record({
    gymName: text,
    gymImgUrl: text,
    gymLocation: text,
    gymDescription: text,
    emailAddress: text
});

const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text,
    AlreadyExist: text,
    NotAuthorized: text
});

const gymStorage = StableBTreeMap(0, text, Gym);
const ORDER_RESERVATION_PERIOD = 120n;
const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

// Documenting the expected behavior of verifyPaymentInternal
/**
 * Verifies the payment by using the Dfinity network's built-in mechanisms.
 * This might involve cryptographic proofs or integrating with a trusted payment service.
 * 
 * @param receiver - The receiver's principal
 * @param amount - The amount to verify
 * @param block - The block in which the payment was recorded
 * @param memo - The memo attached to the payment
 * @returns A boolean indicating whether the payment was verified
 */
async function verifyPaymentInternal(receiver: Principal, amount: nat64, block: nat64, memo: nat64): Promise<boolean> {
    // Implement secure payment verification using Dfinity's mechanisms
    return true; // Replace with actual verification logic
}

export default Canister({
    getAllGyms: query([], Vec(Gym), () => {
        return gymStorage.values();
    }),

    getGymById: query([text], Result(Gym, Message), (id) => {
        const gym = gymStorage.get(id);
        if ("None" in gym) {
            return Err({ NotFound: `Gym with id=${id} not found` });
        }
        return Ok(gym.Some);
    }),

    createGymProfile: update([GymPayload], Result(Gym, Message), (payload) => {
        if (!payload.gymName || !payload.gymImgUrl || !payload.gymLocation || !payload.gymDescription || !payload.emailAddress) {
            return Err({ InvalidPayload: "Missing required fields" });
        }

        const gym = { id: uuidv4(), owner: ic.caller(), members: Vec(), gymServices: Vec(), ...payload };
        gymStorage.insert(gym.id, gym);
        return Ok(gym);
    }),

    updateGymById: update([text, GymPayload], Result(Gym, Message), (id, payload) => {
        const gymOpt = gymStorage.get(id);
        if ("None" in gymOpt) {
            return Err({ NotFound: `Cannot update gym: gym with id=${id} not found` });
        }

        const gym = gymOpt.Some;
        if (gym.owner.toText() !== ic.caller().toText()) {
            return Err({ NotAuthorized: `You are not the owner of this gym with id=${id}` });
        }

        const updatedGym = {
            ...gym,
            gymName: payload.gymName,
            gymImgUrl: payload.gymImgUrl,
            gymLocation: payload.gymLocation,
            gymDescription: payload.gymDescription,
            emailAddress: payload.emailAddress
        };

        gymStorage.insert(id, updatedGym);
        return Ok(updatedGym);
    }),

    gymMembershipRegistration: update([MembershipPayload, Principal, nat64, nat64, nat64], Result(Gym, Message), async (payload, receiver, amount, block, memo) => {
        if (!payload.fullName || !payload.userName || !payload.emailAddress) {
            return Err({ InvalidPayload: "Missing required fields" });
        }

        const { gymId, fullName, userName, emailAddress } = payload;
        const gymOpt = gymStorage.get(gymId);

        if ("None" in gymOpt) {
            return Err({ NotFound: `Gym with id=${gymId} not found` });
        }

        const gym = gymOpt.Some;
        if (gym.members.some(member => member.userId === ic.caller().toText())) {
            return Err({ AlreadyExist: "User already exists" });
        }

        const paymentVerified = await verifyPaymentInternal(receiver, amount, block, memo);
        if (!paymentVerified) {
            return Err({ PaymentFailed: "Payment verification failed" });
        }

        gym.members.push({ userId: ic.caller().toText(), userName, gymId, fullName, emailAddress });
        gymStorage.insert(gymId, gym);

        return Ok(gym);
    }),

    getAllEnrolledByGymId: query([text], Result(Vec(MembershipPayload), Message), (id) => {
        const gymOpt = gymStorage.get(id);
        if ("None" in gymOpt) {
            return Err({ NotFound: `Gym with id=${id} not found` });
        }

        const gym = gymOpt.Some;
        return Ok(gym.members);
    }),

    addGymService: update([GymServicePayload], Result(Gym, Message), (payload) => {
        if (!payload.serviceName || !payload.serviceDescription || !payload.operatingDaysStart || !payload.operatingDaysEnd) {
            return Err({ InvalidPayload: "Missing required fields" });
        }

        const { gymId, serviceName, serviceDescription, operatingDaysStart, operatingDaysEnd } = payload;
        const gymOpt = gymStorage.get(gymId);

        if ("None" in gymOpt) {
            return Err({ NotFound: `Gym with id=${gymId} not found` });
        }

        const gym = gymOpt.Some;
        if (gym.owner.toText() !== ic.caller().toText()) {
            return Err({ NotAuthorized: `You are not the owner of this gym with id=${gymId}` });
        }

        gym.gymServices.push({ gymId, serviceName, serviceDescription, operatingDaysStart, operatingDaysEnd });
        gymStorage.insert(gymId, gym);
        return Ok(gym);
    }),

    getAllServicesById: query([text], Result(Vec(GymServicePayload), Message), (id) => {
        const gymOpt = gymStorage.get(id);
        if ("None" in gymOpt) {
            return Err({ NotFound: `Gym with id=${id} not found` });
        }

        const gym = gymOpt.Some;
        return Ok(gym.gymServices);
    }),

    deleteGymById: update([text], Result(text, Message), (id) => {
        const gymOpt = gymStorage.get(id);
        if ("None" in gymOpt) {
            return Err({ NotFound: `Cannot delete the gym: gym with id=${id} not found` });
        }

        const gym = gymOpt.Some;
        if (gym.owner.toText() !== ic.caller().toText()) {
            return Err({ NotAuthorized: `You are not the owner of this gym with id=${id}` });
        }

        gymStorage.remove(id);
        return Ok(gym.id);
    }),

    verifyPayment: query([Principal, nat64, nat64, nat64], bool, async (receiver, amount, block, memo) => {
        return await verifyPaymentInternal(receiver, amount, block, memo);
    }),

    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0);
    }),

    makePayment: update([text, nat64], Result(Message, Message), async (to, amount) => {
        const toPrincipal = Principal.fromText(to);
        const toAddress = hexAddressFromPrincipal(toPrincipal, 0);
        const transferFeeResponse = await ic.call(icpCanister.transfer_fee, { args: [{}] });
        const transferFee = transferFeeResponse.transfer_fee.e8s;
        const transferResult = await ic.call(icpCanister.transfer, {
            args: [{
                memo: 0n,
                amount: { e8s: amount - transferFee },
                fee: { e8s: transferFee },
                from_subaccount: None,
                to: binaryAddressFromAddress(toAddress),
                created_at_time: None
            }]
        });

        if ("Err" in transferResult) {
            return Err({ PaymentFailed: `Payment failed, err=${transferResult.Err}` });
        }

        return Ok({ PaymentCompleted: "Payment completed" });
    })
});
