const graphql = require('graphql');
const dbService = require('./data/dbService') 
const { GraphQLObjectType, GraphQLString, GraphQLID,GraphQLSchema, GraphQLList, GraphQLFloat } = graphql;

//var employees = db.employees.list()
//var companies = db.companies.list() 

const EmployeeType = new GraphQLObjectType({ 
    name: "Employee",
    fields: ()=>({
        id: {type: GraphQLID}, 
        firstName: {type: GraphQLString}, 
        lastName:  {type: GraphQLString}, 
        companyId: {type: GraphQLID},
        company: {
            type: CompanyType,
            resolve(parent, args){
                //console.log(parent);
                let found = {
                    id: 1001, 
                    name: "HLC", 
                    location:  "Ottawa",
                    rating: 4.1,
                }
                return found;
            }
        } 
    })
 })
 
const CompanyType = new GraphQLObjectType({ 
    name: "Company",
    fields: ()=>({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        location:  {type: GraphQLString},
        rating: {type: GraphQLFloat},
        employee: {
            type: GraphQLList(EmployeeType),
            resolve(parent, args){
                //console.log(parent);
                //let found = employees.filter((employee => parent.id === employee.companyId))
                let found = [{
                    id: 1,
                    firstName: "John", 
                    lastName:  "Smith", 
                    companyId: 1001,
                }] 
                return found;
            }
        } 
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        companies: {
            type: new GraphQLList(CompanyType),
            async resolve(parent, args){
                let companies = await dbService.getCompanies()
                return companies;
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args){
                let employees = await dbService.getEmployees()
                return employees;
            }
        },
        employeesById: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                let employees = await dbService.getEmployees()
                let found = employees.find((employee => parseInt (employee.id) === parseInt (args.id)))
                return found
            }
         },
         employeesAtCompany: {
            type: new GraphQLList(EmployeeType),
            args: { companyId: { type: GraphQLID } },
            async resolve(parent, args) {
                let employees = await dbService.getEmployees()
                let found = employees.filter((employee=> parseInt(employee.companyId) === parseInt(args.companyId)))
                return found
            }
         }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLID },  
                name: { type: GraphQLString },  
                location: { type: GraphQLString },  
                rating: { type: GraphQLFloat }
            },
            resolve(parent, args){
                let company = {
                    id: args.id,
                    name: args.name,
                    location: args.location,
                    rating: args.rating
                };
                //console.log (company)
                //let id = db.companies.create(company);
                //console.log (id) 
                return company;
            }
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID },  
                firstName: { type: GraphQLString }, 
                lastName: { type: GraphQLString }, 
                password: { type: GraphQLString },  
                companyId: { type: GraphQLID }
            },
            resolve(parent, args){
                let employee = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    password: args.password,
                    companyId: args.companyId
                };
                //let id = db.employees.create(employee);
                return employee;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});