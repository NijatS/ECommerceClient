import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }
  start(hubUrl: string) {
    if (
      !this._connection ||
      this._connection?.state == HubConnectionState.Disconnected
    ) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection
        .start()
        .then(() => {
          console.log('Connected');
        })
        .catch((error) => setTimeout(() => this.start(hubUrl), 2000));
        this._connection = hubConnection;
    }

    // this._connection.onreconnected(connectionId =>{
    //   console.log("Reconnected")
    // })
    // this._connection.onreconnecting(error=> console.log("Reconnecting"))

  }

  invoke(procedureName:string,message:any,successCallBack?:(value)=>void,errorCallBack?:(value)=>void) {
     this.connection.invoke(procedureName,message)
     .then(successCallBack)
     .catch(errorCallBack)
  }
  on(procedureName:string,callBack:(...message:any)=>void) {
    this.connection.on(procedureName,callBack);
  }
}
