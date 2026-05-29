import { useSelector }
from "react-redux";

import {
    Navigate
} from "react-router-dom";

function ProtectedRoute({
    children
}) {

    const accessToken =
        useSelector(
            state =>
                state.auth.accessToken
        );

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;