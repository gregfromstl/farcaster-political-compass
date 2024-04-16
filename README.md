# Farcaster Political Compass

A simple frame and accompanying web UI that uses your past casts to determine where you are on the political compass. When a user clicks the frame, it reads there past N casts, creates an embedding from them, and compares this embedding to embeddings of some directional prompts. It then performs normalization based on past results to determine the user's coordinates on the compass and display them back to the frame.

The actual results have mixed accuracy, partly because this is an oversimplified approach meant to be a fun game, partially because 250 character casts aren't the best judge of most peoples' political stance. It was a fun experiment and some notable people like Vitalik tried it out. This was my first frame and was built using my own library called [Devcaster](https://github.com/gregfromstl/devcaster).


<img width="599" alt="Screenshot 2024-04-16 at 11 37 10 AM" src="https://github.com/gregfromstl/farcaster-political-compass/assets/17715009/b28968e8-fd1d-4202-8aee-dce5156028ca">

<img width="1555" alt="Screenshot 2024-04-16 at 11 39 52 AM" src="https://github.com/gregfromstl/farcaster-political-compass/assets/17715009/1a1d5c9c-cb06-4655-95e7-fe90c873620e">

[Launch post 1](https://warpcast.com/gregfromstl/0x8d9bd079)
[Launch post 2](https://warpcast.com/gregfromstl/0xac0abe37)


