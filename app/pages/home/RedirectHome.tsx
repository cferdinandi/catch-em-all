import { redirect } from 'react-router';

// Redirect user to homepage on load
export async function clientLoader() {
	return redirect('/');
}
