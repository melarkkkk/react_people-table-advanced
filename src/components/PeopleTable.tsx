import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SortField } from '../types/SortField';
import { FiltersContext } from '../context/FiltersContext';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  selectedPerson: Person | null;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ selectedPerson }) => {
  const { visiblePeople } = useContext(PeopleContext);
  const { sortField, sortOrder } = useContext(FiltersContext);

  const getSortParams = (value: SortField) => {
    let params = {};

    if (sortField !== value) {
      params = { sortField: value, sortOrder: null };
    } else if (sortOrder === '') {
      params = { sortOrder: 'desc' };
    } else if (sortOrder === 'desc') {
      params = { sortField: null, sortOrder: null };
    } else {
      params = { sortOrder: 'desc' };
    }

    return params;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortField).map(value => {
            const title = value[0].toUpperCase() + value.slice(1);
            const params = getSortParams(value);

            return (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink params={params} className="icon has-text-link">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sortField !== value,
                        'fa-sort-up': sortField === value && !sortOrder,
                        'fa-sort-down':
                          sortField === value && sortOrder === 'desc',
                      })}
                    />
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const isSelected = selectedPerson
            ? person.slug === selectedPerson.slug
            : false;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
