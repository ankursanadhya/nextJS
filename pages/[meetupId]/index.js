import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  console.log("props");
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://tester123:tester123@youtube-tut.rxy944l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); // to get hold of tht databse to which we are connecting
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("meetupId", meetupId);

  //fetch data for single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://tester123:tester123@youtube-tut.rxy944l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); // to get hold of tht databse to which we are connecting
  const meetupsCollection = db.collection("meetups");
  const selectedMeetups = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  // console.log("meetups", meetups);
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      },
    },
  };
}
export default MeetupDetails;
