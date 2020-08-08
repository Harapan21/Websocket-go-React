package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{}
var clients = make(map[*websocket.Conn]bool) // broadcast channel
var broadcast = make(chan string)

func main() {
	http.HandleFunc("/", handleConnections)
	go handleMessages()
	http.ListenAndServe(":8080", nil)
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	clients[ws] = true
	for {
		_, msg, err := ws.ReadMessage()
		// Read in a new message as JSON and map it to a Message object
		if err != nil {
			return
		}
		fmt.Printf("%s sent: %s\n", ws.RemoteAddr(), string(msg))

		// if err = ws.WriteMessage(msgType, msg); err != nil {
		// 	return
		// }
		// Send the newly received message to the broadcast channel
		broadcast <- string(msg)
	}
}
func handleMessages() {
	for {
		// Grab the next message from the broadcast channel

		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
