export type FieldValidate = (value: string) => string | undefined

export const required: FieldValidate = (value) => {
    if (value) return undefined
    return "Field is required"
}

export const maxLengthCreator = (maxLength: number): FieldValidate => (value: string) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}


