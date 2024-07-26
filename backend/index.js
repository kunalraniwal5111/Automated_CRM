import 'dotenv/config'
import { ApolloServer, gql } from 'apollo-server-express';
import express from "express"
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Lead } from './model/Lead.js';
import nodemailer from "nodemailer"

const app = express()
app.use(cors({
origin : ["https://automated-crm-lac.vercel.app/"],
methods:["POST","GET"],
credentials:true
});
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    };
    return transporter.sendMail(mailOptions);
}



// graphQL schema
const typeDefs = gql`
  type Query {
    leads: [Lead]
  }

  type Mutation {
    addLead(name: String!, email: String!, phone:String!, status: String!): Lead
    updateLeadStatus(id: ID!, status: String!): Lead
  }

  type Lead {
    id: ID!
    name: String!
    email: String!
    phone:String!
    status: String!
  }
`;

// Resolvers
const resolvers = {
    Query: {
        leads: async () => await Lead.find(),
    },
    Mutation: {
        addLead: async (_, { name, email, phone, status }) => {
            const lead = new Lead({ name, email, phone, status });
            await lead.save();
            await sendEmail(email, 'Welcome!', `Greetings ${name}, welcome to our team`);
            return lead;
        },
        updateLeadStatus: async (_, { id, status }) => {
            try {
                const lead = await Lead.findById(id);
                if (!lead) throw new Error('Lead not found');
                lead.status = status;
                await lead.save();
                await sendEmail(lead.email, 'Lead Status Updated', `Greetings ${lead.name}, your status has been updated to ${status}.`);
                return lead;
            } catch (error) {
                console.error('Error updating lead status:', error);
                throw new ApolloError('Failed to update lead status');
            }
        },
    },
};

const startServer = async () => {
    const app = express();

    // Setup Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    // Connect to MongoDB
    await connectDB()

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();
