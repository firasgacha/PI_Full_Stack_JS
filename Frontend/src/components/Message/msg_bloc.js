{allMsgs.length>0? 
                
    <Paper id="style-1" className={classes.messagesBody}>
        <div>
            {allMsgs.map((msg) =>
                <div key={msg.id}>
                    {msg.from == "1" ?
                        <div>
                            <MessageRight

                                message={msg.content}
                                // timestamp={msg.timestamp}
                                photoURL="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                // displayName="Admin"
                                avatarDisp={true}
                            />
                            {/* {msg.createdAt} */}
                        </div>
                        : <div>
                            <MessageLeft

                                message={msg.content}
                                // timestamp={msg.timestamp}
                                photoURL="https://www.gpao.fr/wp-content/uploads/2020/03/62681-flat-icons-face-computer-design-avatar-icon.png"
                                // displayName="User"
                                avatarDisp={true}
                            />
                            {/* {msg.createdAt} */}
                        </div>
                    }
                </div>
            )}
        </div>
    </Paper> 
    : allMsgs.length==0 ?
    
    <Paper id="style-1" className={classes.messagesBody}>
        <div>
            {props.msgs.map((msg) =>
                <div key={msg.id}>
                    {msg.from == "1" ?
                        <div>
                            <MessageRight

                                message={msg.content}
                                // timestamp={msg.timestamp}
                                photoURL="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                // displayName="Admin"
                                avatarDisp={true}
                            />
                            {/* {msg.createdAt} */}
                        </div>
                        : <div>
                            <MessageLeft

                                message={msg.content}
                                // timestamp={msg.timestamp}
                                photoURL="https://www.gpao.fr/wp-content/uploads/2020/03/62681-flat-icons-face-computer-design-avatar-icon.png"
                                // displayName="User"
                                avatarDisp={true}
                            />
                            {/* {msg.createdAt} */}
                        </div>
                    }
                </div>
            )}
        </div>
    </Paper>
    :null}