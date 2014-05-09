Session.setDefault('progress_queue', {jobs: 1.0, completed: 1.0});
Progress = {
    add: function(){
        var queue = Session.get('progress_queue');
        var jobs = queue['jobs'] + 1.0;
        var completed = queue['completed'] ;
        Session.set('progress_queue', {
            jobs: jobs,
            completed: completed
        });
    },
    finish: function(){
        var queue = Session.get('progress_queue');
        var jobs = queue['jobs'];
        var completed = queue['completed'] + 1.0;
        if (jobs == completed){
            Session.set('progress_queue', {
                jobs: 1.0,
                completed: 1.0
            });
        }else{
            Session.set('progress_queue', {
                jobs: jobs,
                completed: completed
            });
        }
    },
    update: function(){
        var queue = Session.get('progress_queue');
        var jobs = queue['jobs'];
        var completed = queue['completed'] ;
        if (jobs == completed){
            NProgress.done();
        }else{
            NProgress.start();
            NProgress.set(completed/jobs);
        }
    }
}
Deps.autorun(Progress.update);
