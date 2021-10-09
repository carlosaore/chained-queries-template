import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import axios from "./axios";
import Spinner from "./Spinner";

const SimpleQuery = () => {
	const [currentUserEmail, setCurrentUserEmail] = useState("javisastre@gmail.com")

	const onSuccessHandler = () => console.log("Simple query successful. Look at it in react dev tools (Query -> BaseQuery -> State -> CurrentResult -> data -> data")

	const { isLoading, error, data, refetch } = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["UserProfileData", currentUserEmail],
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/user/login/${currentUserEmail}`),
		{
			enabled: false, // this stops the query from running automatically
			onSuccess: onSuccessHandler
		}
	);

	const simpleQueryHandler = () => {
		refetch();
	}

	// useEffect so it will run on first render when we still haven't performed a fetch
	// This is just for demonstration purposes
	useEffect(() => {
		console.log("SimpleQuery isLoading", isLoading);
		console.log("SimpleQuery error", error);
		console.log("SimpleQuery data", data);
	}, [data, error, isLoading])

	// to console.log what's already on the isLoading, error and data states and actually see what came back from
	// the fetch, we need to execute them on the query success (line 16)


	return (
		<>
			<p>This query doesn't run automatically, it's triggered by the button click</p>
			<button onClick={simpleQueryHandler}>Simple query</button>
			<h3>Result:</h3>
			<div className="results">
				{!isLoading && data ? <p>{data.data.firstName} {data.data.lastName}</p> : <Spinner />}
				{!isLoading && data ? <p>{data.data.email}</p> : <Spinner />}
				{!isLoading && data ? <p>{data.data.gender}</p> : <Spinner />}
			</div>
		</>
	)
}

export default SimpleQuery;