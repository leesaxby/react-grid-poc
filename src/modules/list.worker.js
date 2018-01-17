import oboe from 'oboe';
import { List } from 'immutable';

let myList = [];
let chunkCount = 50000;

oboe('http://localhost:3000')
    .node('list.*', res => {
        myList.push(res)

        if ( (myList.length % chunkCount) === 0 ) {
           self.postMessage({ list: myList })
           myList.length = 0;
           chunkCount = 100000;
        }

        // Free up node for garbage collection.
        return oboe.drop;
    })
    .done(data => console.log(`Done - records: ${myList.length}`))
    .fail(err => console.log(err));
