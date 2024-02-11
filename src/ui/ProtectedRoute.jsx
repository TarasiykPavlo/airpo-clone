import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import spinLogo from "./../assets/spinLogo.svg";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	const { isLoading, isAuthenticated } = useUser();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate("/login");
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading)
		return (
			<div
				style={{
					height: "100vh",
					display: "grid",
					placeItems: "center",
				}}
			>
				<img src={spinLogo} className="loader-spin" width={"150"} />
			</div>
		);

	if (isAuthenticated) return children;
}

export default ProtectedRoute;
