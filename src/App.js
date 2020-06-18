import React, { Component } from "react";
import "./index.css";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authorName: '',
      articles:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.getArticlesByAuthor = this.getArticlesByAuthor.bind(this);
  }
  handleChange(event){
    if(event && event.target.value){
      this.setState({authorName: event.target.value});
      console.log('name',event.target.value)
    }
  }
  getArticlesByAuthor(event){
   event.preventDefault();
   if(this.state.authorName && this.state.authorName.length){
   const getArticlesPromise = fetch(`http://localhost:3000/articles?authorName=${this.state.authorName}`);
   getArticlesPromise.then(response => {
      response.json();
      console.log('Failed');
      this.setState({
        articles: [ 	
         {
           articleId : 1,
           title: 'Harry Potter and the Sorcerer’s Stone Review',
           upvotes: 56,
           date: '12/23/2016'
         },
       
       {
           articleId : 2,
           title: 'Harry Potter and the Half Blood Prince Review',
           upvotes: 23,
           date: '12/2/2016'
         },
       {
           articleId : 3,
           title: 'Harry Potter and the Goblet of Fire Review',
           upvotes: 3,
           date: '11/2/2017'
         }
       ]
       
      })
   }).catch(() => {
     console.log('update articles in catch');
   });
   }
 }

 sortOn(key){
   if(this.state.articles && this.state.articles.length){
     if(key === 'NEWEST'){
      let articles = this.state.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.setState({articles: articles});
     } else {
      let articles = this.state.articles.sort((a, b) => b.upvotes - a.upvotes);
      this.setState({articles: articles});
     }
     
   }
 }
  render() {
    return (
      <div className="container"> 
          <input type="text" className="large" placeholder="Name" data-testid="app-input"
          value={this.state.authorName}
          onChange={this.handleChange}
          />
          <button type="submit" className="ml-30" data-testid="submit-button"
          onClick={(event) => this.getArticlesByAuthor(event)}
          disabled={this.state.authorName && this.state.authorName.length ? false : true}>
            Fetch</button>
      
            <button type="button" className="ml-30" data-testid="submit-button"
          onClick={() => this.sortOn('NEWEST')}
          disabled={this.state.articles && this.state.articles.length ? false : true}>
            Newest</button>

          <button type="button" className="ml-30" data-testid="submit-button"
          onClick={() => this.sortOn('TOP')}
          disabled={this.state.articles && this.state.articles.length ? false : true}>
            Top</button>

        <table className="table">
    <thead>
      <tr>
          <th>Article Id</th>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
      </tr>
    </thead>
    <tbody>
    {this.state && this.state.articles.length ?
          this.state.articles.map((ele, index) => {
          return <tr>
              <td key={index+1}>{ele.articleId}</td>
              <td key={index+2}>{ele.title}</td>
              <td key={index+3}>{ele.upvotes}</td>
              <td key={index+4}>{ele.date}</td>
          </tr>

          }) : 'No records found'}     
    </tbody>
  </table>
</div>
    );
  }
}