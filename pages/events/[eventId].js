import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import Head from "next/head";

function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    console.log("loading");
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
      </Head>
      <meta name="description" content={event.description} />
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const event = await getEventById(params.eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30, //s
  };
}

export async function getStaticPaths() {
  const data = await getFeaturedEvents();

  const params = data.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: params,
    fallback: "blocking",
  };
}
