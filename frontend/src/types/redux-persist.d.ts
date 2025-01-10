/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'redux-persist/es/persistStore' {
    import { Persistor } from 'redux-persist';
    export default function persistStore(store: any): Persistor;
  }
  