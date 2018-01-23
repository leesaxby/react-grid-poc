import oboe from 'oboe';

let myList = [];
let chunkCount = 20000;

oboe('http://localhost:3000/list')
    .node('list.*', res => {
        myList.push(res);

        if ( (myList.length % chunkCount) === 0 ) {
           self.postMessage(JSON.stringify({ list: myList }));
           myList.length = 0;
           chunkCount = 100000;
        }

        // Free up node for garbage collection.
        return oboe.drop;
    })
    .done(() => console.log('Done'))
    .fail(err => console.log(err));
