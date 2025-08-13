import classNames from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, isSelected }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    mother,
    fatherName,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName ? motherName : '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        </td>
      ) : (
        <td>{fatherName ? fatherName : '-'}</td>
      )}
    </tr>
  );
};
