function formWizard() {
  document.querySelector<any>("#profile-img-file-input")?.addEventListener("change", function () {
    const e = document.querySelector<any>(".user-profile-image");
    const t = document.querySelector<any>(".profile-img-file-input")?.files?.[0];
    const r = new FileReader();
  
    r.addEventListener("load", function () {
      e!.src = r.result as string;
    });
  
    if (t) {
      r.readAsDataURL(t);
    }
  });
  
  document.querySelectorAll<HTMLDivElement>(".form-steps")?.forEach(function (l) {
    l.querySelectorAll<HTMLButtonElement>(".nexttab")?.forEach(function (t) {
      const e = l.querySelectorAll<HTMLButtonElement>('button[data-bs-toggle="pill"]');
      e.forEach(function (e) {
        e.addEventListener("show.bs.tab", function (e:any) {
          e.target?.classList.add("done");
        });
      });
  
      t.addEventListener("click", function () {
        l.classList.add("was-validated");
        l.querySelectorAll<any>(".tab-pane.show .form-control").forEach(function (e) {
          if (e.value.length > 0 && e.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            const nextTabId = t.getAttribute("data-nexttab");
            document.getElementById(nextTabId!)?.click();
            l.classList.remove("was-validated");
          }
        });
      });
    });
  
    l.querySelectorAll<HTMLButtonElement>(".previestab")?.forEach(function (o:any) {
      o.addEventListener("click", function () {
        const e = o.getAttribute("data-previous");
        const doneElements:any = Array.from(o.closest("form")?.querySelectorAll(".custom-nav .done"));
        const t = doneElements.length;
  
        for (let r = t - 1; r < t; r++) {
          if (doneElements[r]) {
            doneElements[r].classList.remove("done");
          }
        }
  
        document.getElementById(e!)?.click();
      });
    });
  
    const a = l.querySelectorAll<HTMLButtonElement>('button[data-bs-toggle="pill"]');
    a.forEach(function (r, o) {
      r.setAttribute("data-position", o.toString());
      r.addEventListener("click", function () {
        let e: number;
        l.classList.remove("was-validated");
  
        if (r.getAttribute("data-progressbar")) {
          e = document.getElementById("custom-progress-bar")!.querySelectorAll("li").length - 1;
          e = (o / e) * 100;
          (document.getElementById("custom-progress-bar")?.querySelector(".progress-bar") as HTMLElement).style.width = e + "%";
        }
  
        if (l.querySelectorAll(".custom-nav .done").length > 0) {
          Array.from(l.querySelectorAll(".custom-nav .done")).forEach(function (e) {
            e.classList.remove("done");
          });
        }
  
        for (let t = 0; t <= o; t++) {
          if (a[t].classList.contains("active")) {
            a[t].classList.remove("done");
          } else {
            a[t].classList.add("done");
          }
        }
      });
    });
  });
}

export { formWizard };