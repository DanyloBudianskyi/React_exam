import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import { useCart } from "../../context/CartContext"
import { SCHEMA_CHECKOUT } from "./schemaValidate"

const initialValues = {
    name: "",
    phone: "",
    deliveryAdress: "",
    comment: ""
}

const configLabels = {
  doughType: "Тісто",
  extras: "Начинки",
  size: "Розмір",
  volume: "Обʼєм",
  quantity: "Кількість",
};

const Checkout = () => {
    const {cart, clearCart, totalPrice} = useCart()

    const handleSubmit = () => {
        clearCart()
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema: SCHEMA_CHECKOUT,
    })
    const {dirty} = formik
    return(
        <>
            <ul>
                {cart.map((item, idx) => (
                <li key={idx}>
                    <strong>{item.name}</strong> — {item.quantity} шт. — {item.price * item.quantity} грн
                    {item.config && (
                    <ul style={{ marginLeft: "1rem", fontStyle: "italic" }}>
                        {Object.entries(item.config).map(([key, value]) => (
                            <li key={key}>
                                {configLabels[key]}: {Array.isArray(value) ? value.join(", ") : value}
                            </li>
                        ))}
                    </ul>
                )}
                </li>
            ))}
            </ul>
            <p><strong>Загальна сума:</strong> {totalPrice} грн</p>
            <FormikProvider value={formik}>
                <Form>
                    <div>
                        <Field type="text" name="name" placeholder="Ім'я"/>
                        <ErrorMessage component="span" name="name"/>
                    </div>
                    <div>
                        <Field type="text" name="phone" placeholder="Номер телефону"/>
                        <ErrorMessage component="span" name="phone"/>
                    </div>
                    <div>
                        <Field type="text" name="deliveryAdress" placeholder="Адреса"/>
                        <ErrorMessage component="span" name="deliveryAdress"/>
                    </div>
                    <div>
                        <Field type="text" name="comment" placeholder="Коментар до замовлення(необов'язково)"/>
                        <ErrorMessage component="span" name="comment"/>
                    </div>
                    <div>
                        <input disabled={!dirty} type="submit" value="Підтвердити замовлення"/>
                        <input type="reset" value="Очистити форму"/>
                    </div>
                </Form>
            </FormikProvider>
        </>
    )
}

export default Checkout