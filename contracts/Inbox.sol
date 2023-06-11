pragma solidity ^0.4.17;

contract Inbox {
    address manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, block.timestamp, players));
    }

    function winner() public {
        require(players.length>0, "not enough players");
        uint indx = random() % players.length;
        players[indx].transfer(address(this).balance);
        players = new address[](0);
    }
}
