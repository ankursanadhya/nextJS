import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

import Head from "next/head";
import { Fragment } from "react";
function NewMeetupPage() {
  const router = useRouter();

  // const onAddMeetupHandler = (enteredMeetupData) => {
  //   console.log(enteredMeetupData);
  // };
  async function onAddMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add new Meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage;
