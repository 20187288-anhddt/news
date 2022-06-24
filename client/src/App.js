import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/commons/Navbar";
import Footer from "./components/commons/Footer";

// auth
import WithAuth from "./WithAuth";

// ScrollToTop
import ScrollToTop from "./ScrollToTop";

import "./App.css";

// admin
const Admin = React.lazy(() => import("./components/pages/admin"));

// news page
const Category = React.lazy(() => import("./components/pages/category"));
const Detail = React.lazy(() => import("./components/pages/detail"));

function App() {
	return (
		<Router className="App">
			<ScrollToTop />
			<div className="container-fluid mt-6 mb-3 min-h-100vh">
				<Navbar />
				<React.Suspense
					fallback={
						<div className="main-loader">
							<div className="loader"></div>
						</div>
					}
				>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/contact" component={Contact} />
						<Route
							path="/admin"
							component={() => WithAuth(Admin)}
						/>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/profile" component={Profile} />
						<Route path="/category/*/:id" component={Category} />
						<Route path="/*/:id" component={Detail} />
						<Route path="/*" component={NotFound} />
					</Switch>
				</React.Suspense>
				<div></div>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
