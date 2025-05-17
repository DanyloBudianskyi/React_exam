import * as yup from 'yup'

const SCHEMA_NAME = yup.string().matches(/^[a-zа-яіїєґА-ЯІЇЄҐ' -]{2,20}$/i, "Ім'я може містити лише літери, апостроф, дефіс або пробіли").required("Ім'я обов'язкове")
const SCHEMA_PHONE = yup.string().matches(/^[+0-9]{10,14}$/, "Номер телефону має бути дійсним").required("Номер телефону обов'язковий")
const SCHEMA_ADRESS = yup.string().min(5, "Адресса занадто коротка").max(80, "Адресса занадто довга").required("Адресса обов'язкова")

export const SCHEMA_CHECKOUT = yup.object({
    name: SCHEMA_NAME,
    phone: SCHEMA_PHONE,
    deliveryAdress: SCHEMA_ADRESS,
    comment: yup.string().max(300, "Коментар занадто довгий").notRequired()
})