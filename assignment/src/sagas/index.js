import { fork } from "@redux-saga/core/effects";
import watchUserAuthentication from './watchers';

export default function* startForman() {
    yield fork(watchUserAuthentication);
}