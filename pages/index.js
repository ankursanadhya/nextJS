import { MongoClient } from "mongodb";
import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { Fragment } from "react";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "first meetup",
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/17/19/19/mannheim-8000879__340.jpg",
//     address: "some City",
//     description: "this is first meetup",
//   },
//   {
//     id: "m2",
//     title: "second meetup",
//     image:
//       "https://cdn.pixabay.com/photo/2023/05/17/19/19/mannheim-8000879__340.jpg",
//     address: "some 2 City",
//     description: "this is second meetup",
//   },
// ];
function HomePage(props) {
  return (
    // <Layout>
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="browse huge list of React Meetup Event"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
    // </Layout>
  );
}
// export async function getServerSideProps(context) {
//   const req=context.req; // it is used for authentication
//   const res=context.res;
//   //fetch data from api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  // api calling
  const client = await MongoClient.connect(
    "mongodb+srv://tester123:tester123@youtube-tut.rxy944l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); // to get hold of tht databse to which we are connecting
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        id: item._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
