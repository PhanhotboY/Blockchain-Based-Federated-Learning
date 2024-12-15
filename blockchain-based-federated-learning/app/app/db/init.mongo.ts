import os from "os";
import mongoose from "mongoose";

import { mongodbConfig } from "../config/mongo.config";

const { dbHost, dbName, dbPort, dbUser, dbPwd } = mongodbConfig;

//Using Singleton pattern to init mongodb
class MongoDB {
  static instance: MongoDB;
  retryCount: number = 0;

  constructor() {
    if (!mongoose.connection.readyState) {
      this.handleConnectionEvent();
    }
  }

  async connect(type?: string) {
    if (mongoose.connection.readyState === 0) {
      if (process.env.VITE_NODE_ENV === "development") {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });
      }

      console.log("Retrying to connect to MongoDB...", this.retryCount);
      this.retryCount++;

      await mongoose
        .connect(`mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}`, {
          connectTimeoutMS: 1000,
          serverSelectionTimeoutMS: 2000,
          dbName,
        })
        .catch(() => {});
    }
  }

  async disconnect(type?: string) {
    await mongoose.disconnect().finally(() => {
      console.log("MongoDB disconnected");
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDB();
    }

    return this.instance;
  }

  handleConnectionEvent() {
    mongoose.connection.on("error", async (e) => {
      console.log("MongoDB connection error");
      if (this.retryCount > 10) {
        throw new Error("Error connecting to MongoDB" + e);
      }
      await this.connect("mongodb");
    });

    // @ts-ignore
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to MongoDB...");
    });

    // @ts-ignore
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
      this.retryCount = 0;
      this.logStatus();
    });

    // @ts-ignore
    mongoose.connection.on("close", () => {
      console.log("MongoDB connection closed");
      this.retryCount = 0;
    });
  }

  logStatus() {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const mem = process.memoryUsage().rss;
    const maxConnection = numCores * 5;

    if (numConnections === maxConnection) {
      console.log("Connection overload detected!");
    }

    console.log("Active connections::::", numConnections);
    console.log("Memory usage::::", mem / 1024 / 1024, "MB");
  }
}

export const mongodbInstance = MongoDB.getInstance();
