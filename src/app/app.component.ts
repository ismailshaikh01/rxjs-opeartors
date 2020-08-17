import { Component, OnInit } from '@angular/core';
import { of, from, interval, combineLatest, forkJoin, Subject, concat, merge } from 'rxjs';
import { take, map,tap, concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'rxjs-demo-app';
  posts: any[];


  ngOnInit() {
    this.posts = [{id:0, model:"ferrari"},{id:1, model:"lamborgini"},{id:2, model:"bmw"}];

// of & from method .
  console.log("result from OF method")
  of(1,2,3,4).subscribe(console.log);

  console.log("result from FROM method")
  from([1,2,3,4,5,6,7,8]).subscribe(
    item => console.log(`result is ${item}`),
    error => console.log(`error occured ${error}`),
    ()=> console.log('process completed')
  )

// using map, tap, take operators.
  console.log("result from OF MAP,TAKE,TAP method");
  from([10,20,30,40,50])
  .pipe(
    map( item => item* 2),
    tap( item => console.log(`item are .. ${item}`)),
    take(2)
  ).subscribe({
    next : item => console.log(item),
    error : err => console.log(err),
    complete:()=> console.log('completed')
  })

// using combine latest
  console.log("result from COMBINE LATEST, FORKJOIN operator");
  const x = interval(1000).pipe(take(5));
  const y = interval(3000).pipe(take(5));

    combineLatest(x,y).subscribe({
      next : value => console.log(value),
      error : err => console.log(err),
      complete: ()=> console.log('completed ')
    })

// using forkJoin
    forkJoin(x,y).subscribe({
      next : value => console.log(value),
      error : err => console.log(err),
      complete: ()=> console.log('completed ')
    })

// using concatmap and mergemap operators.

const concatposts$ = of(0,1,2).pipe(
  tap(id => console.log("concatmap source", id)),
  concatMap(id => this.getposts(id))
)
const mergeMapposts$ = of(0,1,2).pipe(
  tap(id => console.log("mergeMap source", id)),
  concatMap(id => this.getposts(id))
)

concatposts$.subscribe(item => console.log("concat result",item));
mergeMapposts$.subscribe(item => console.log("mergeMap result",item))


// using subject and behaviour subject

const subject = new Subject <string>();


subject.subscribe({next : (v) => console.log(`observer a ${v}`)});
subject.subscribe({next : (v) => console.log(`observer b ${v}`)});


subject.next('hello ')
subject.next("hello 1");


// using concat method

const car = ["audi","bmw","lambo","ferrari"];
const engine = ['automatic',"self-driving", "manual","ai"];


const result = concat(car,engine);
 result.subscribe(
   {
     next: result => console.log("concatresult", result)
   }
 )

const mergeresult = merge(car,engine);
mergeresult.subscribe({
  next: result => console.log(`result from merge ${result}`),
  error : err => console.log(`error occured ${err}`),
  complete : ()=> console.log("process completed")
})

  }
  getposts(id){
return of(this.posts[id]);
  }
}
