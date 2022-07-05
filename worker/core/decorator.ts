export function property(defaultValue: unknown = undefined): PropertyDecorator {
    return (target: Record<string, unknown>, name: string): void => {
        if (defaultValue !== undefined) {
            target[name] = defaultValue
        }

        Reflect.defineMetadata("fields", true, target, name)
    }
}
