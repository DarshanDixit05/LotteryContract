pragma solidity ^0.4.17;

contract Lottery {
    address manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, block.timestamp, players));
    }
    modifier restricted {
        require(msg.sender == manager);
        _;
    }
    function winner() public restricted {
        uint indx = random() % players.length;
        players[indx].transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns(address[])
    {
        return players;
    }
}