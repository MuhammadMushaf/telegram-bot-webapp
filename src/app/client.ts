import { createThirdwebClient, defineChain } from "thirdweb";
import { ethereum, bsc } from "thirdweb/chains";


// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "74a5a29a79fb1fb345c1b7825124355d";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = defineChain(bsc)