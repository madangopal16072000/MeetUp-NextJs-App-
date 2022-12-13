// if(process.env.NODE_ENV !== 'production')
// {
//   require('dotenv').config();
// }

import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head'

const DUMMY_MEETUPS = [
    {
        id : 'm1',
        title : 'A First Meetup',
        image : "https://news.yale.edu/sites/default/files/styles/featured_media/public/ynews-machu_picchu_peru-wiki.jpg?itok=89lytjAa&c=07307e7d6a991172b9f808eb83b18804",
        address : 'Some Second Address',
        description : 'This is the First Meetup'
    },
    {
        id : 'm2',
        title : 'A Second Meetup',
        image : "https://static.toiimg.com/photo/53336957.cms",
        address : 'Some Second Address',
        description : 'This is the Second Meetup'
    },
]
function HomePage(props){
    return <Fragment>
        <Head>
            <title>MeetMe</title>
            <meta name='description' content='Browse a huge list of highly active MeetMe meetups!'/>
        </Head>
        <MeetupList meetups = {props.loadedMeetups}/>
    </Fragment>
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from API

//     return {
//         props : {
//             loadedMeetups : DUMMY_MEETUPS,
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data

    const client = await MongoClient.connect(process.env.DB_URL);


    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props : {
            loadedMeetups : meetups.map((meetup) => {
                return {
                    title : meetup.title,
                    image : meetup.image,
                    address : meetup.address,
                    id : meetup._id.toString()
                }
            })
        },
        revalidate : 1
    }
}
export default HomePage;