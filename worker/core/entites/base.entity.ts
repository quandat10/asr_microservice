export class BaseEntity {
    /**
     * @param params
     */
    setAttributes(params: Record<string, unknown>): void {
        const keys = Object.keys(params)
        for (const key of keys) {
            this[key] = params[key];
        }

        return;
    }
}
