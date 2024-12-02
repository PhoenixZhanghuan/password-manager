import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e);
    }
};

export const setItemStorage = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const removeItemStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};

export const mergeItemStorage = async (key: string, value: string) => {
    try {
        await AsyncStorage.mergeItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
};

export const getAllKeysStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (e) {
        console.log(e);
    }
};

export const multiRemoveStorage = async (keys: string[]) => {
    try {
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        console.log(e);
    }
};

export const multiSetStorage = async (values: any[]) => {
    try {
        await AsyncStorage.multiSet(values);
    } catch (e) {
        console.log(e);
    }
};

export const multiGetStorage = async (keys: string[]) => {
    try {
        return await AsyncStorage.multiGet(keys);
    } catch (e) {
        console.log(e);
    }
};

export const multiMergeStorage = async (values: any[]) => {
    try {
        await AsyncStorage.multiMerge(values);
    } catch (e) {
        console.log(e);
    }
};