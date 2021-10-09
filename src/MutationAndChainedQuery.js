import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "./axios";
import Spinner from "./Spinner";

const MutationAndChainedQuery = () => {
	const [currentUserEmail, setCurrentUserEmail] = useState("javisastre@gmail.com")
	const [currentUserId, setCurentUserId] = useState("6155f408dbfb75b08c2106f1")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	const { isLoading: userIsLoading, error: userError, data: userData, refetch: userRefetch } = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["User Profile Data 2", currentUserEmail], // try removing the " 2" so the one in <ChainedQueries /> gets auto refetched (same key)
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/user/login/${currentUserEmail}`),
		{
			enabled: false, // this stops the query from running automatically
		}
	);

	const updateUserProfile = useMutation(
		(data) => {
			return axios.put(
				`/user/update/${currentUserId}`,
				data
			);
		},
		{
			onSuccess: userRefetch,
			onError: (error) => console.error(error),
		}
	);

	const editUserProfileHandler = (e) => {
		e.preventDefault()
		const data = {
			firstName,
			lastName
		};
		updateUserProfile.mutate(data)
	}

	return (
		<section className="section">
			<h2>Chained queries</h2>
			<p>Submit to send data to the backend and, on success, trigger a query (but could be whatever you want)</p>
			<form onSubmit={editUserProfileHandler}>
				<label htmlFor="first-name">First name</label>
				<input type="text" id="first-name" onChange={e => setFirstName(e.target.value)}/>
				<label htmlFor="last-name">Last name</label>
				<input type="text" id="last-name" onChange={e => setLastName(e.target.value)}/>
				<button type="submit">Submit</button>
			</form>
			<h3>Result:</h3>
			<div className="results">
				{!userIsLoading && userData ? <p>{JSON.stringify(userData.data)}</p> : <Spinner />}
			</div>

		</section>
	)
}

export default MutationAndChainedQuery;