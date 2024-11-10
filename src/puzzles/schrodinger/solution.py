class Cat:
    alive_ = False

    @property
    def alive(self):
        self.alive_ = not self.alive_
        return self.alive_
