# Full Stack Application (Node.js, Sqlite) with GraphQl

This project was a skeleton of full stack application with a Node.js (Express) server,

with a Sqlite database, built in with with GraphQl 

## GraphQl Server 

var { graphqlHTTP } = require('express-graphql');

app.use('/graphql', graphqlHTTP({

   schema: schema,

   graphiql: true,

 }));

## Sqlite

database = new sqlite3.Database("./data/data.db"); 


## How to test on GraphiQL

### find all employees:

{ employees {

   lastName,

   firstName,

}}

mapped to resolver:

employees:() => db.employees.list()

### find all companies:

{companies {

   id,

   name

}}

mapped to resolver:

companies:() => db.companies.list() 

### find an employee of a given employee id:

employeesById(id:"E1001") {  

     id, 

     firstName,

     lastName

  }  

}  

mapped to resolver:

employeesById: (obj, args, context, info) => 
      
  db.employees.list().filter((employee => employee.id === args.id))
   

### find all employees from a company of a given company id:

{employeesAtCoompany(companyId: "com-102") {

     firstName,

     lastName

   }

}

mapped to resolver :

employeesAtCoompany: (obj, args, context, info) => {
      
   return db.employees.list().filter((employee=> employee.companyId 
   
   === args.companyId))
   
}

## mutation:

### addCompany

mutation {

  addCompany (id: "com-106", name:"Costume", location:"Toronto", rating: 4.04) {

      id,

      name,

      location,

      rating

  }

}

### addEmployee

mutation {

  addEmployee (id: "e1009", firstName:"James", lastName:"Yong", password:"Toronto", companyId: "com-105") {
    id,

    firstName,

    companyId,

  }
  
}


