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

   company {

     name

   }

}}

mapped to resolver:

employees = await dbService.getEmployees()

### find all companies:

{companies {

   id,

   name,

   employee {

     firstName

   }

}}

mapped to resolver:

let companies = await dbService.getCompanies()

### find an employee of a given employee id:

employeesById(id: 2) {  

     id, 

     firstName,

     lastName

  }  

}  

mapped to resolver:

let all = await dbService.getEmployees()

let found = all.find((employee => parseInt (employee.id) === parseInt (args.id)))
   

### find all employees from a company of a given company id:

{employeesAtCompany(companyId: 1001) {

     firstName,

     lastName

   }

}

mapped to resolver :

let employees = await dbService.getEmployees()

let found = employees.filter((employee=> parseInt(employee.companyId) === parseInt(args.companyId)))

## mutation:

### addCompany

mutation {

  addCompany (id: 1005, name:"Costume", location:"Toronto", rating: 4.04) {

      id,

      name,

      location,

      rating

  }

}

### addEmployee

mutation {

  addEmployee (id: 9, firstName:"James", lastName:"Yong", companyId: 1005) {

    id,

    firstName,

    companyId,

  }
  
}


