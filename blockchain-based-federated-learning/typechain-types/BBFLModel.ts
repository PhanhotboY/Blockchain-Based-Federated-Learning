/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace BBFLModel {
  export type ModelStruct = {
    id: BigNumberish;
    upadteId: BigNumberish;
    owner: AddressLike;
    modelHash: string;
    timestamp: BigNumberish;
  };

  export type ModelStructOutput = [
    id: bigint,
    upadteId: bigint,
    owner: string,
    modelHash: string,
    timestamp: bigint
  ] & {
    id: bigint;
    upadteId: bigint;
    owner: string;
    modelHash: string;
    timestamp: bigint;
  };

  export type ModelUpdateStruct = {
    id: BigNumberish;
    owner: AddressLike;
    score: BigNumberish;
    modelHash: string;
    epoch: BigNumberish;
    learningRate: BigNumberish;
    batchSize: BigNumberish;
    prevModelId: BigNumberish;
    accuracy: BigNumberish;
    timestamp: BigNumberish;
  };

  export type ModelUpdateStructOutput = [
    id: bigint,
    owner: string,
    score: bigint,
    modelHash: string,
    epoch: bigint,
    learningRate: bigint,
    batchSize: bigint,
    prevModelId: bigint,
    accuracy: bigint,
    timestamp: bigint
  ] & {
    id: bigint;
    owner: string;
    score: bigint;
    modelHash: string;
    epoch: bigint;
    learningRate: bigint;
    batchSize: bigint;
    prevModelId: bigint;
    accuracy: bigint;
    timestamp: bigint;
  };
}

export interface BBFLModelInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getLatestModel"
      | "getModelUpdates"
      | "getModels"
      | "getRoundHighestScoredUpdate"
      | "modelUpdates"
      | "models"
      | "owner"
      | "round"
      | "updatesPerRound"
      | "uploadModelUpdate"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ModelAdded" | "ModelUpdateAdded" | "RoundEnded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getLatestModel",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getModelUpdates",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getModels", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoundHighestScoredUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "modelUpdates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "models",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "round", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updatesPerRound",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "uploadModelUpdate",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getLatestModel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getModelUpdates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModels", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoundHighestScoredUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modelUpdates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "models", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "round", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updatesPerRound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uploadModelUpdate",
    data: BytesLike
  ): Result;
}

export namespace ModelAddedEvent {
  export type InputTuple = [
    id: BigNumberish,
    updateId: BigNumberish,
    owner: AddressLike,
    modelHash: string,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    id: bigint,
    updateId: bigint,
    owner: string,
    modelHash: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    id: bigint;
    updateId: bigint;
    owner: string;
    modelHash: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ModelUpdateAddedEvent {
  export type InputTuple = [
    id: BigNumberish,
    owner: AddressLike,
    score: BigNumberish,
    modelHash: string,
    epoch: BigNumberish,
    learningRate: BigNumberish,
    batchSize: BigNumberish,
    prevModelId: BigNumberish,
    accuracy: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    id: bigint,
    owner: string,
    score: bigint,
    modelHash: string,
    epoch: bigint,
    learningRate: bigint,
    batchSize: bigint,
    prevModelId: bigint,
    accuracy: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    id: bigint;
    owner: string;
    score: bigint;
    modelHash: string;
    epoch: bigint;
    learningRate: bigint;
    batchSize: bigint;
    prevModelId: bigint;
    accuracy: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoundEndedEvent {
  export type InputTuple = [round: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [round: bigint, timestamp: bigint];
  export interface OutputObject {
    round: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BBFLModel extends BaseContract {
  connect(runner?: ContractRunner | null): BBFLModel;
  waitForDeployment(): Promise<this>;

  interface: BBFLModelInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getLatestModel: TypedContractMethod<
    [],
    [BBFLModel.ModelStructOutput],
    "view"
  >;

  getModelUpdates: TypedContractMethod<
    [],
    [BBFLModel.ModelUpdateStructOutput[]],
    "view"
  >;

  getModels: TypedContractMethod<[], [BBFLModel.ModelStructOutput[]], "view">;

  getRoundHighestScoredUpdate: TypedContractMethod<
    [_round: BigNumberish],
    [BBFLModel.ModelUpdateStructOutput],
    "view"
  >;

  modelUpdates: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        owner: string;
        score: bigint;
        modelHash: string;
        epoch: bigint;
        learningRate: bigint;
        batchSize: bigint;
        prevModelId: bigint;
        accuracy: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  models: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, string, string, bigint] & {
        id: bigint;
        upadteId: bigint;
        owner: string;
        modelHash: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  round: TypedContractMethod<[], [bigint], "view">;

  updatesPerRound: TypedContractMethod<[], [bigint], "view">;

  uploadModelUpdate: TypedContractMethod<
    [
      modelHash: string,
      score: BigNumberish,
      epoch: BigNumberish,
      learningRate: BigNumberish,
      batchSize: BigNumberish,
      prevModelId: BigNumberish,
      accuracy: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getLatestModel"
  ): TypedContractMethod<[], [BBFLModel.ModelStructOutput], "view">;
  getFunction(
    nameOrSignature: "getModelUpdates"
  ): TypedContractMethod<[], [BBFLModel.ModelUpdateStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getModels"
  ): TypedContractMethod<[], [BBFLModel.ModelStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getRoundHighestScoredUpdate"
  ): TypedContractMethod<
    [_round: BigNumberish],
    [BBFLModel.ModelUpdateStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "modelUpdates"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        owner: string;
        score: bigint;
        modelHash: string;
        epoch: bigint;
        learningRate: bigint;
        batchSize: bigint;
        prevModelId: bigint;
        accuracy: bigint;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "models"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, string, string, bigint] & {
        id: bigint;
        upadteId: bigint;
        owner: string;
        modelHash: string;
        timestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "round"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "updatesPerRound"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "uploadModelUpdate"
  ): TypedContractMethod<
    [
      modelHash: string,
      score: BigNumberish,
      epoch: BigNumberish,
      learningRate: BigNumberish,
      batchSize: BigNumberish,
      prevModelId: BigNumberish,
      accuracy: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  getEvent(
    key: "ModelAdded"
  ): TypedContractEvent<
    ModelAddedEvent.InputTuple,
    ModelAddedEvent.OutputTuple,
    ModelAddedEvent.OutputObject
  >;
  getEvent(
    key: "ModelUpdateAdded"
  ): TypedContractEvent<
    ModelUpdateAddedEvent.InputTuple,
    ModelUpdateAddedEvent.OutputTuple,
    ModelUpdateAddedEvent.OutputObject
  >;
  getEvent(
    key: "RoundEnded"
  ): TypedContractEvent<
    RoundEndedEvent.InputTuple,
    RoundEndedEvent.OutputTuple,
    RoundEndedEvent.OutputObject
  >;

  filters: {
    "ModelAdded(uint256,uint256,address,string,uint256)": TypedContractEvent<
      ModelAddedEvent.InputTuple,
      ModelAddedEvent.OutputTuple,
      ModelAddedEvent.OutputObject
    >;
    ModelAdded: TypedContractEvent<
      ModelAddedEvent.InputTuple,
      ModelAddedEvent.OutputTuple,
      ModelAddedEvent.OutputObject
    >;

    "ModelUpdateAdded(uint256,address,uint256,string,uint256,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<
      ModelUpdateAddedEvent.InputTuple,
      ModelUpdateAddedEvent.OutputTuple,
      ModelUpdateAddedEvent.OutputObject
    >;
    ModelUpdateAdded: TypedContractEvent<
      ModelUpdateAddedEvent.InputTuple,
      ModelUpdateAddedEvent.OutputTuple,
      ModelUpdateAddedEvent.OutputObject
    >;

    "RoundEnded(uint256,uint256)": TypedContractEvent<
      RoundEndedEvent.InputTuple,
      RoundEndedEvent.OutputTuple,
      RoundEndedEvent.OutputObject
    >;
    RoundEnded: TypedContractEvent<
      RoundEndedEvent.InputTuple,
      RoundEndedEvent.OutputTuple,
      RoundEndedEvent.OutputObject
    >;
  };
}
