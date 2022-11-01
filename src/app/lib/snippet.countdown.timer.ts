let counterTimer$ = this.start().subscribe((_) => {
    if (this.time.days <= 0) {
        this.time = {
          hours: 0,
          minutes: 0,
          seconds: 0,
          days: 0
        }
        counterTimer$.unsubscribe();
    }
});