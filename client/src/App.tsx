import Routes from "./Routes";
import RestaurantsListContextProvider from "./context/RestaurantsListContextProvider";

function App() {
	return (
		<RestaurantsListContextProvider>
            <Routes />
        </RestaurantsListContextProvider>
	);
}

export default App;
