import React, { useState } from "react";

import Table                from "@mui/material/Table";
import TableBody            from "@mui/material/TableBody";
import TableCell            from "@mui/material/TableCell";
import TableContainer       from "@mui/material/TableContainer";
import TableRow             from "@mui/material/TableRow";
import Paper                from "@mui/material/Paper";
import Checkbox             from "@mui/material/Checkbox";

import ActionMenu           from "./ActionMenu";
import EnhancedTableHead    from "../../EnhancedTableHead";
import EnhancedTableToolbar from "../../EnhancedTableToolbar";

import {getComparator, stableSort} from "../../tableUtils";

// TODO: refactor this component
// TODO: fix sorting functionnality for cells with JSX elements

function EnhancedTable({
  headCells, 
  rows,
	
	//toolbarProps: {label, onDelete}
	toolbarProps,
	
  actionMenuProps,
}) {

  const [order,    setOrder]    = useState("asc");
  const [orderBy,  setOrderBy]  = useState("calories");
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (
    event,
    property
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Paper
			sx={{
				width: '100%',					
				backgroundColor: "white",
				backgroundImage: "none",
				// boxShadow: "0 2px 2px #00000025",
				boxShadow: "none",
				// border: '1px solid #9db2bf',
				borderRadius: "5px",
				overflow: "hidden",
			}}
		>

			<EnhancedTableToolbar 
				selected={selected}
				setSelected={setSelected}
        // label={toolbarLabel}
				label={toolbarProps.label}
        onDelete={toolbarProps.onDelete}
			/>

			<TableContainer
				sx={{
					maxHeight: "600px",
				}}
			>
				<Table
					// size={"medium"}
					size={"small"}
					stickyHeader
					sx={{
						'& .MuiTableCell-root': {
							// borderBottomColor: "#f2f2f2",
							// borderBottomColor: "#b3b2ba",
						}
					}}
				>
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
            headCells={headCells}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.map((row, rowIndex) => {

								const isItemSelected = isSelected(row.id);

								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										
									>
										<TableCell 
											padding="none"
										>
											<Checkbox
												color="primary"
												checked={isItemSelected}
												onClick={(event) => handleClick(event, row.id)}
											/>
										</TableCell>
                    {
                      headCells.map(
                        (headCell) => {
                          return (
                            <TableCell
                              component="th"
                              scope="row"
                              key={headCell.id}
                              padding="none"
                              sx={{
                                fontSize: "12px",
                              }}
                            >
                              {row[headCell.id]}
                            </TableCell>
                          )
                        }
                      )
                    }

										{
											actionMenuProps && (
												<TableCell
													component="th"
													scope="row"
													padding="none"
													sx={{
														fontSize: "12px",
													}}
												>
													<ActionMenu
														{...actionMenuProps} 
														row={row}
													/>
												</TableCell>
											)
										}
									</TableRow>
								);
							})}
					</TableBody>

				</Table>

			</TableContainer>

    </Paper>
  );
}

export default EnhancedTable;