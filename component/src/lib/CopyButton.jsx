import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Query from 'graphql-query-builder';

export default function CopyButton({ dataset, schema, filter, disabled }) {
    const datasetQuery = new Query(dataset)
        .find(schema.fields.map((item) => item.name))
        .filter(Object.assign(filter, { limit: 100 }));

    //since order _by format is asc and desc but the graphql string
    //containd this format as 'asc' and 'desc' this will always give error
    //hence we check theis string and remove the quote

    let queryString = datasetQuery.toString();

    if (queryString.includes('asc')) {
        queryString = queryString.replace('"asc"', 'asc');
    } else {
        queryString = queryString.replace('"desc"', 'desc');
    }

    const queryToCopy = `
    query Dataset {
      ${queryString}
    }
  `;

    return (
        <CopyToClipboard text={queryToCopy} title={disabled ? 'submit to enable button' : ''} disabled={disabled}>
            <button type="button">Copy query</button>
        </CopyToClipboard>
    );
}
