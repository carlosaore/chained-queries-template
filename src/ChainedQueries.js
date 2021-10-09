import { useState } from "react";
import { useQuery } from "react-query";
import axios from "./axios";
import Spinner from "./Spinner";

const ChainedQueries = () => {
	const [currentUserEmail, setCurrentUserEmail] = useState("javisastre@gmail.com")
	const [centerId, setCenterId] = useState("6159e22652216db44f251044")

	const { isLoading: employeesIsLoading, error: employeesError, data: employeesData, refetch: employeesRefetch } = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["Center Employees", centerId],
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/center/employees/${centerId}`),
		{
			enabled: false, // this stops the query from running automatically
		}
	);

	const { isLoading: servicesIsLoading, error: servicesError, data: servicesData, refetch: servicesRefetch } = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["Center Services", centerId],
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/center/services/${centerId}`),
		{
			enabled: false, // this stops the query from running automatically
			onSuccess: employeesRefetch
		}
	);

	const { isLoading: userIsLoading, error: userError, data: userData, refetch: userRefetch } = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["User Profile Data", currentUserEmail],
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/user/login/${currentUserEmail}`),
		{
			enabled: false, // this stops the query from running automatically
			onSuccess: servicesRefetch
		}
	);

	const chainedQueriesHandler = () => {
		userRefetch();
	}

	return (
		<section className="section">
			<h2>Chained queries</h2>
			<p>These queries don't run automatically, they are triggered by the button click</p>
			<button onClick={chainedQueriesHandler}>Chained query</button>
			<h3>Result:</h3>
			<div className="results">
				{!userIsLoading && userData ? <p>{JSON.stringify(userData.data)}</p> : <Spinner />}
				{!servicesIsLoading && servicesData ? <p>{JSON.stringify(servicesData.data)}</p> : <Spinner />}
				{!employeesIsLoading && employeesData ? <p>{JSON.stringify(employeesData.data)}</p> : <Spinner />}
			</div>
		</section>
	)
}

export default ChainedQueries;