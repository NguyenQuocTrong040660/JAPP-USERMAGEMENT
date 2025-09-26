const ls = typeof window !== "undefined" ? window.localStorage : null;

const localealStorageService = {
    setItem(key, value) {
        if (!ls) return false;
        try {
            ls.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    getItem(key) {
        if (!ls) return null;
        const raw = ls.getItem(key);
        try {
            return JSON.parse(raw);
        } catch {
            return raw;
        }
    },

}

export default localealStorageService;