import { configureStore } from "@reduxjs/toolkit";
import celenganSentSlice from "./features/celenganSentSlice";
import celenganReceivedSlice from "./features/celenganReceivedSlice";
import qurbanSentSlice from "./features/qurbanSentSlice";
import zakatFitrahReceivedSlice from "./features/zakatFitrahReceivedSlice";
import zakatFitrahSentSlice from "./features/zakatFitrahSentSlice";

export default configureStore({
    reducer: {
        celenganSent: celenganSentSlice,
        celenganReceived: celenganReceivedSlice,
        qurbanSent: qurbanSentSlice,
        zakatFitrahReceived: zakatFitrahReceivedSlice,
        zakatFitrahSent: zakatFitrahSentSlice,
    },
});