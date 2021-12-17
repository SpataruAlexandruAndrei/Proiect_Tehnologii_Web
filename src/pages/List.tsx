import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { FeedbackFromPerson } from '../../api/FeedbackFromPerson';


export interface ListProps {
  ownersList?: FeedbackFromPerson[];
}

export default function List({ownersList}: ListProps) {
  return (
    <div>
      {ownersList?.map((e, index) => (
        <div key={index}>
          <Link as={`/${e.details}/${e.person}`} href="/[details]/[person]">
            <a>
              Navigate to {e.details}'s {e.person}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/vehicles');
  const feedbackList: FeedbackFromPerson[] | undefined = await response.json();
  return {feedbackList: feedbackList}
}