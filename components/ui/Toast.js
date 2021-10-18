import { useSelector } from "react-redux"


export default function Toast() {

    const { ui: { toastMsg } } = useSelector(state => state);

    return (
        <div className="toast">
            {toastMsg}
        </div>
    )
}

