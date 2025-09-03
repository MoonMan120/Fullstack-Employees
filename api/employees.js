import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

// TODO: this file!
router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res
        .status(400)
        .send("Request must have a name, birthday, and salary ");

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

router.param("id", async (req, res, next, id) => {
  if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0)
    return res.status(400).send("ID must be a positive integer.");
  const employee = getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found.");
  req.employee = employee;
  next();
});
router
  .route("/:id")
  .get((req, res) => {
    res.send(req.employee);
  })
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res
        .status(400)
        .send("Request must have a name, birthday, and salary ");

    const employee = await updateEmployee({
      id: req.employee.id,
      name,
      birthday,
      salary,
    });
    res.send(employee);
  })
  .delete(async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
  });
