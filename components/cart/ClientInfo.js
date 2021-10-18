import { useState } from "react"
import { useForm } from "../../hooks/useForm"
import Checkout from '../stripe/Checkout'


export default function ClientInfo() {

    const [formValues, handleInputChange] = useForm({
        street: '',
        col: '',
        zip: '',
        extNumber: '',
        intNumber: '',
        refs: '',
        name: '',
        phoneNum: ''
    })

    const { street, col, zip, extNumber, intNumber, refs, name, phoneNum } = formValues;

    const [loading, setLoading] = useState(false);

    return (
        <div className="client-info">
            {
                loading && <div className="cont-spinner"><div className="spinner"></div></div>
            }
            <h3>Resumen del pedido</h3>
            <div className="form">
                <div className="form__item">
                    <label htmlFor="name">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form__item">
                    <label htmlFor="phoneNum">
                        Número de contácto
                    </label>
                    <input
                        id="phoneNum"
                        type="number"
                        name="phoneNum"
                        value={phoneNum}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form__item">
                    <label htmlFor="street">
                        Calle
                    </label>
                    <input
                        id="street"
                        type="text"
                        name="street"
                        value={street}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form__item">
                    <label htmlFor="col">
                        Colonia
                    </label>
                    <input
                        id="col"
                        type="text"
                        name="col"
                        value={col}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form__item">
                    <label htmlFor="zip">
                        Código postal
                    </label>
                    <input
                        id="zip"
                        type="number"
                        name="zip"
                        value={zip}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="group">
                    <div className="form__item">
                        <label htmlFor="extNumber">
                            Número exterior
                        </label>
                        <input
                            id="extNumber"
                            type="number"
                            name="extNumber"
                            value={extNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form__item">
                        <label htmlFor="intNumber">
                            Número interior
                        </label>
                        <input
                            id="intNumber"
                            type="number"
                            name="intNumber"
                            value={intNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <Checkout formValues={formValues} setLoading={setLoading} />
            </div>
        </div>
    )
}
